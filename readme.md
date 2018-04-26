[![npm version](https://badge.fury.io/js/proton-cluster.svg)](https://badge.fury.io/js/proton-cluster)

# A clustered starter for Node.js applications

## Starting workers by CPUs
```typescript
ProtonCluster.startByCPUS(() => {
   console.log("Process");
});
```

## Starting workers by specified number
```typescript
ProtonCluster.start(8, () => {
   console.log("Process");
});
```

## Starting Protontype application
```typescript
ProtonCluster.startByCPUS(() => {
   new ProtonApplication()
   .addRouter(new TasksRouter())
   .start();
});
```

## Setup events behaviors

Events behaviors should be configured before start clusters.

```typescript
ProtonCluster.onOnline(worker => {
    console.log(`I am Online Event`);
});

ProtonCluster.onExit(worker => {
    console.log(`I am Exit Event`);
});

ProtonCluster.onDisconnect(worker => {
    console.log(`I am Disconnect Event`);
});

ProtonCluster.onMessage(worker => {
    console.log(`I am Message Event`);
});

ProtonCluster.startByCPUS(() => {
    console.log("Test");
});
```

## Cluster instance
You can access native Node.js cluster instance

```typescript
let cluster = ProtonCluster.cluster;

cluster.on("online", worker => {
    console.log(`Cluster ${worker.process.pid} online`);
});
```

