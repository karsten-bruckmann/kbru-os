import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
const cmp = require('semver-compare');

export interface CompareExecutorOptions {
    packageName: string;
}

export default async function echoExecutor(
    options: CompareExecutorOptions,
    context: ExecutorContext
): Promise<{ success: boolean }> {
    const localVersion = JSON.parse(
        fs
            .readFileSync(
                './' +
                    context.workspace.projects[context.projectName].root +
                    '/package.json'
            )
            .toString()
    ).version;

    const { stdout } = await promisify(exec)(
        `npm show ${options.packageName} version`
    );
    const remoteVersion = stdout.trimEnd();

    console.info(`Local version in package.json: ${localVersion}`);
    console.info(`Latest version in registry:    ${remoteVersion}`);

    if (1 !== cmp(localVersion, remoteVersion)) {
        console.error('Version is not increased');
        return { success: false };
    }

    return { success: true };
}
