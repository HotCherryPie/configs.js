// @ts-check

import path from 'node:path';

import ts from 'typescript';

/**
 * @param {string} tsconfigLocation
 * @param {string} cwd
 * @returns {string[]}
 */
export function getTsConfigIncludedFiles(
  tsconfigLocation,
  cwd = process.cwd(),
) {
  /**
   * @type {import('typescript').Diagnostic[]}
   */
  const unrecoverableErrors = [];
  /**
   * @param {import('typescript').Diagnostic} it
   * @returns {void}
   */
  const onUnRecoverableConfigFileDiagnostic = (it) =>
    void unrecoverableErrors.push(it);

  const parsed = ts.getParsedCommandLineOfConfigFile(
    tsconfigLocation,
    {},
    { ...ts.sys, onUnRecoverableConfigFileDiagnostic },
  );

  const diagnostics = [...unrecoverableErrors, ...(parsed?.errors ?? [])];
  if (diagnostics.length > 0) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
      }),
    );
  }

  const paths = parsed?.fileNames ?? [];

  return paths.map((it) =>
    it.replace(new RegExp(`^${cwd.replaceAll(path.sep, '/')}`, 'i'), '.'),
  );
}
