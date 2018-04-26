import cluster from 'cluster';
import os from 'os';

export class ProtonCluster {
    public static readonly cluster = cluster;
    private static disconnect: Function;
    private static online: Function;
    private static exit: Function;
    private static message: Function;

    public static startByCPUS(starter: Function) {
        const CPUS = os.cpus();
        this.start(CPUS.length, starter);
    }

    public static start(qtd: number, starter: Function) {
        if (this.cluster.isMaster) {
            let i = 0;
            while (i < qtd) {
                this.cluster.fork();
                i++;
            }
            this.cluster.on("disconnect", worker => {
                if (this.disconnect) {
                    this.disconnect(worker);
                } else {
                    console.log(`Cluster ${worker.process.pid} disconnected`);
                }
            });
            this.cluster.on("online", worker => {
                if (this.online) {
                    this.online(worker);
                } else {
                    console.log(`Cluster ${worker.process.pid} online`);
                }
            });
            this.cluster.on("exit", worker => {
                if (this.exit) {
                    this.exit();
                } else {
                    console.log(`Cluster ${worker.process.pid} down`);
                    this.cluster.fork();
                }
            });
            this.cluster.on("message", worker => {
                if (this.message) {
                    this.message();
                }
            });
        } else {
            starter();
        }
    }

    public static onDisconnect(disconnectFunction: Function): ProtonCluster {
        this.disconnect = disconnectFunction;
        return this;
    }

    public static onOnline(onlineFunction: Function): ProtonCluster {
        this.online = onlineFunction;
        return this;
    }

    public static onExit(exitFunction: Function): ProtonCluster {
        this.exit = exitFunction;
        return this;
    }

    public static onMessage(messageFunction: Function): ProtonCluster {
        this.message = messageFunction;
        return this;
    }
}