const childProcess = require('child_process');
const { fromCwd } = require('quickenv');
const { REMOTE_MAINAPP_DIR, CMDS, IS_WINDOWS } = require('./consts.js');

exports.runCmd = (cmd, opts = {}) => {
  opts = {
    exit: true,
    quiet: false,
    ...opts,
  };

  const { exit, quiet } = opts;

  if (Array.isArray(cmd)) {
    cmd = cmd.join(IS_WINDOWS ? ' && ' : ';');
  }

  try {
    childProcess.execSync(cmd, {
      stdio: [
        process.stdin,
        quiet ? null : process.stdout,
        quiet ? null : process.stderr,
      ],
    });
    return 0;
  } catch (error) {
    if (exit) {
      process.exit(1);
    }
    return 1;
  }
};

exports.remoteExec = (...cmdList) => {
  exports.runCmd(
    `${CMDS.ssh} 'cd ${REMOTE_MAINAPP_DIR}; ${cmdList.join(';')}'`,
  );
};

exports.removeDiacritics = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** From: https://gist.github.com/vaiorabbit/5657561 */
exports.hashString = str => {
  /* eslint-disable */
  const FNV1_32A_INIT = 0x811c9dc5;
  let hval = FNV1_32A_INIT;
  for (let i = 0; i < str.length; ++i) {
    hval ^= str.charCodeAt(i);
    hval +=
      (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return hval >>> 0;
  /* eslint-enable */
};

exports.getWebpackConfigPath = id =>
  fromCwd('node_modules', '@mamba', 'webpack', `config.${id}.js`);
