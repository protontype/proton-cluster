import * as assert from 'assert';
import { suite, test } from 'mocha-typescript'
import { ProtonCluster } from '../src/ProtonCluster';

@suite('ProtonClusterTest')
class ProtonClusterTest {

    @test('startByCPUSTest')
    startByCPUS() {
        ProtonCluster.onOnline(worker => {
            assert.equal(worker.process.pid != null, true);
            console.log(`Cluster ${worker.process.pid} Online`);
        });
        ProtonCluster.onDisconnect(worker => {
            assert.equal(worker.process.pid != null, true);
            console.log(`Cluster ${worker.process.pid} Disconnected`);
            worker.process.exit(0);
        });
        ProtonCluster.startByCPUS(() => {
            console.log("Test");
        });
    }

    after(done) {
        console.log("after");
        for (let id in ProtonCluster.cluster.workers) {
            let worker = ProtonCluster.cluster.workers[id];
            worker.kill();
        }
        done();
    }
}