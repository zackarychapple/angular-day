import {Module} from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthIndicatorResult,
  MemoryHealthIndicator,
  TerminusModule,
  TerminusModuleOptions,
  TypeOrmHealthIndicator
} from '@nestjs/terminus';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as fs from "fs";

const packageJSON: any = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const getTerminusOptions = (
  db: TypeOrmHealthIndicator,
  memory: MemoryHealthIndicator,
  disk: DiskHealthIndicator): TerminusModuleOptions => ({
  endpoints: [
    {
      url: '/healthcheck',
      healthIndicators: [
        async () =>
          appStats(),
        async () =>
          db.pingCheck('database', {timeout: 300}),
        async () =>
          memory.checkHeap('memory_heap', 1024 * 1024 * 1024 * 1024),
        async () =>
          disk.checkStorage('disk', {path: '/', thresholdPercent: .90}),
      ],
    },
  ],
});

const appStats = (): Promise<HealthIndicatorResult> => {
  return new Promise((resolve) => {
    resolve(<HealthIndicatorResult>{
      appStats: {
        status: 'up',
        version: packageJSON.version,
        uptime: process.uptime(),
        platform: process.platform
      },
    })
  })
};

@Module({
  imports: [
    TypeOrmModule,
    TerminusModule.forRootAsync({
      inject: [TypeOrmHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator],
      useFactory: (db, memory, disk) => getTerminusOptions(db, memory, disk),
    })
  ]
})
export class HealthcheckModule {
}
