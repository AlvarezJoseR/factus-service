import app from './app.js';
import variables from './config/variables.config.js';

const myAppinit = async () => {

    await app.started();

  app.listen(variables.PUERTO, (e) => {
       console.log('\x1b[36m');
       console.log('╔═════════════════════════════════════════════════════════════╗');
       console.log('║                                                             ║');
       console.log('║    ███████╗ █████╗  ██████╗████████╗██╗   ██╗███████╗      ║');
       console.log('║    ██╔════╝██╔══██╗██╔════╝╚══██╔══╝██║   ██║██╔════╝      ║');
       console.log('║    █████╗  ███████║██║        ██║   ██║   ██║███████╗      ║');
       console.log('║    ██╔══╝  ██╔══██║██║        ██║   ██║   ██║╚════██║      ║');
       console.log('║    ██║     ██║  ██║╚██████╗   ██║   ╚██████╔╝███████║      ║');
       console.log('║    ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚══════╝      ║');
       console.log('║                                                             ║');
       console.log('║                      🚀 API REST SERVER 🚀                  ║');
       console.log('║                                                             ║');
       console.log('╠═════════════════════════════════════════════════════════════╣');
       console.log(`║  🌐 Servidor corriendo en puerto: ${variables.PUERTO.toString().padEnd(23)} ║`);
       console.log('║  📡 Endpoints disponibles:                                  ║');
       console.log('║                                                             ║');
       console.log('╚═════════════════════════════════════════════════════════════╝');
       console.log('\x1b[0m');
  })
}

myAppinit();