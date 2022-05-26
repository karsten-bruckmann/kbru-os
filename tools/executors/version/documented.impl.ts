import type { ExecutorContext } from '@nrwl/devkit';
import * as fs from 'fs';

export interface DocumentedExecutorOptions {}

export default async function echoExecutor(
    options: DocumentedExecutorOptions,
    context: ExecutorContext
): Promise<{ success: boolean }> {
    const localVersion: string = JSON.parse(
        fs
            .readFileSync(
                './' +
                    context.workspace.projects[context.projectName].root +
                    '/package.json'
            )
            .toString()
    ).version;

    const changelog: string = fs
        .readFileSync(
            './' +
                context.workspace.projects[context.projectName].root +
                '/CHANGELOG.md'
        )
        .toString();

    const pattern = new RegExp(
        `\n##\\s+\\[${localVersion.replace(/\./g, '\\.')}\\]`
    );

    if (!changelog.match(pattern)) {
        console.error(`Pattern ${pattern} not found in CHANGELOG.md`);
        return { success: false };
    }
    return { success: true };
}
