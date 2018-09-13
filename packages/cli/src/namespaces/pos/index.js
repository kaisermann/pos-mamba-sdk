const shell = require('shelljs');
const { CMDS } = require('../../consts.js');
const { remoteExec } = require('../../utils.js');

const getStartCMD = background => (background ? CMDS.startBg : CMDS.start);

const startOpts = {
  background: {
    description: 'Starts the MambaSystem in background',
    default: false,
    alias: ['bg'],
  },
};

module.exports = {
  command: 'pos <command>',
  desc: 'POS related commands',
  builder: yargs =>
    yargs
      .demand(2)
      .command(
        'ssh-init',
        'initializes the POS ssh server',
        {
          tty: {
            description: 'Connected POS tty',
            default: 'Pos0',
          },
        },
        ({ tty }) => {
          shell.exec('xcb kill-server');
          shell.exec(`start_ssh.sh com:/dev/tty${tty}`);
        },
      )
      .command('stop', 'stop the MambaSystem', () => {
        console.info('Stopping MambaSystem');
        remoteExec(CMDS.stop);
      })
      .command(
        'start',
        'start the MambaSystem',
        startOpts,
        ({ background }) => {
          console.info('Starting MambaSystem');
          remoteExec(getStartCMD(background));
        },
      )
      .command(
        'restart',
        'restart the MambaSystem',
        startOpts,
        ({ background }) => {
          console.info('Restarting MambaSystem');
          remoteExec(CMDS.stop, getStartCMD(background));
        },
      )
      .command('build', 'Build MambaSystem', () => {
        shell.exec('$MAMBA/mambaBuildSystem.sh');
      })
      .command('deploy', 'Deploy MambaOS build to POS.', () => {
        shell.exec(
          'xcb installer aup $MAMBA/PAX_S920_pkg/StoneMambaSystem_lib.aup',
        );
        shell.exec(
          'xcb installer aip $MAMBA/PAX_S920_pkg/StoneMambaSystem.aip',
        );
        shell.exec(
          'xcb installer aip $MAMBA/PAX_S920_pkg/StoneMambaLoader.aip',
        );
        console.log('\n Success: MambaOS Deploy Done.');
      }),
};
