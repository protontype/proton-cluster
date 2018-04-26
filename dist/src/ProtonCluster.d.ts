/// <reference types="node" />
import cluster from 'cluster';
export declare class ProtonCluster {
    static readonly cluster: typeof cluster;
    private static disconnect;
    private static online;
    private static exit;
    private static message;
    static startByCPUS(starter: Function): void;
    static start(qtd: number, starter: Function): void;
    static onDisconnect(disconnectFunction: Function): ProtonCluster;
    static onOnline(onlineFunction: Function): ProtonCluster;
    static onExit(exitFunction: Function): ProtonCluster;
    static onMessage(messageFunction: Function): ProtonCluster;
}
