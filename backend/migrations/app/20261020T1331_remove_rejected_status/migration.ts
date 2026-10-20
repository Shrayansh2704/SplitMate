#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1794c4e23fccfe6f090e23f5b186b4b52deb7965553c136d754af26919d65296/contract';
import endContract from '../../snapshots/1794c4e23fccfe6f090e23f5b186b4b52deb7965553c136d754af26919d65296/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/863813db2628b97e4ce3681f5eb63a8df7a6bc79fe172ac5dde7bdcc6f8ffaa4/contract';
import startContract from '../../snapshots/863813db2628b97e4ce3681f5eb63a8df7a6bc79fe172ac5dde7bdcc6f8ffaa4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropCheckConstraint({
        schema: 'public',
        table: 'friendRequest',
        constraint: 'friendRequest_status_check_904c6455',
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'friendRequest',
        constraint: 'friendRequest_status_check_f0e5c74c',
        expression: "\"status\" IN ('PENDING', 'ACCEPTED')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
