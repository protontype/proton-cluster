"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
class ProtonCluster {
    static startByCPUS(starter) {
        const CPUS = os_1.default.cpus();
        this.start(CPUS.length, starter);
    }
    static start(qtd, starter) {
        if (this.cluster.isMaster) {
            let i = 0;
            while (i < qtd) {
                this.cluster.fork();
                i++;
            }
            this.cluster.on("disconnect", worker => {
                if (this.disconnect) {
                    this.disconnect(worker);
                }
                else {
                    console.log(`Cluster ${worker.process.pid} disconnected`);
                }
            });
            this.cluster.on("online", worker => {
                if (this.online) {
                    this.online(worker);
                }
                else {
                    console.log(`Cluster ${worker.process.pid} online`);
                }
            });
            this.cluster.on("exit", worker => {
                if (this.exit) {
                    this.exit();
                }
                else {
                    console.log(`Cluster ${worker.process.pid} down`);
                    this.cluster.fork();
                }
            });
            this.cluster.on("message", worker => {
                if (this.message) {
                    this.message();
                }
            });
        }
        else {
            starter();
        }
    }
    static onDisconnect(disconnectFunction) {
        this.disconnect = disconnectFunction;
        return this;
    }
    static onOnline(onlineFunction) {
        this.online = onlineFunction;
        return this;
    }
    static onExit(exitFunction) {
        this.exit = exitFunction;
        return this;
    }
    static onMessage(messageFunction) {
        this.message = messageFunction;
        return this;
    }
}
ProtonCluster.cluster = cluster_1.default;
exports.ProtonCluster = ProtonCluster;
//# sourceMappingURL=ProtonCluster.js.map