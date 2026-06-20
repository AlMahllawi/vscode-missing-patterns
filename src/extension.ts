import * as vscode from 'vscode';
import { window, commands, ExtensionContext } from 'vscode';

async function openInUntitled(content: string, language?: string) {
    const document = await vscode.workspace.openTextDocument({
        language,
        content,
    });
    vscode.window.showTextDocument(document);
}

async function userSelectTab(
    filenames: string[],
    docs: readonly vscode.TextDocument[],
    label: string
): Promise<{ lines: string[]; text: string } | null> {
    const filename = await window.showQuickPick(filenames, {
        placeHolder: `Choose the ${label} tab`,
    });
    if (filename === undefined) {
        return null;
    }
    const doc = docs[filenames.indexOf(filename)];
    const text = doc.getText();
    const lines = text.split('\n');
    return { lines, text };
}

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('grep-filter.findMissingPatterns', async () => {
        const docs = vscode.workspace.textDocuments;
        const filenames = docs.map(doc => doc.fileName);

        const patternsResult = await userSelectTab(filenames, docs, 'patterns (step 1/2)');
        if (patternsResult === null) { return; }

        const targetResult = await userSelectTab(filenames, docs, 'target (step 2/2)');
        if (targetResult === null) { return; }

        const targetText = targetResult.text;

        // Mirrors: grep -qF "$pattern" target.txt
        // Keep patterns that do NOT appear as a substring anywhere in the target text.
        // An empty pattern always matches (grep -F "" matches every line), so it is excluded.
        const missing = patternsResult.lines.filter(pattern => !targetText.includes(pattern));

        openInUntitled(missing.join('\n'));
    }));
}

export function deactivate() {}
