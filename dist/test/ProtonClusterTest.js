"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const mocha_typescript_1 = require("mocha-typescript");
const ProtonCluster_1 = require("../src/ProtonCluster");
let ProtonClusterTest = class ProtonClusterTest {
    startByCPUS() {
        ProtonCluster_1.ProtonCluster.onOnline(worker => {
            assert.equal(worker.process.pid != null, true);
            console.log(`Cluster ${worker.process.pid} Online`);
        });
        ProtonCluster_1.ProtonCluster.onDisconnect(worker => {
            assert.equal(worker.process.pid != null, true);
            console.log(`Cluster ${worker.process.pid} Disconnected`);
            worker.process.exit(0);
        });
        ProtonCluster_1.ProtonCluster.startByCPUS(() => {
            console.log("Test");
        });
    }
    after(done) {
        console.log("after");
        for (let id in ProtonCluster_1.ProtonCluster.cluster.workers) {
            let worker = ProtonCluster_1.ProtonCluster.cluster.workers[id];
            worker.kill();
        }
        done();
    }
};
__decorate([
    mocha_typescript_1.test('startByCPUSTest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProtonClusterTest.prototype, "startByCPUS", null);
ProtonClusterTest = __decorate([
    mocha_typescript_1.suite('ProtonClusterTest')
], ProtonClusterTest);
//# sourceMappingURL=ProtonClusterTest.js.map