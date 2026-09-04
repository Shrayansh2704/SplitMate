#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/863813db2628b97e4ce3681f5eb63a8df7a6bc79fe172ac5dde7bdcc6f8ffaa4/contract';
import endContract from '../../snapshots/863813db2628b97e4ce3681f5eb63a8df7a6bc79fe172ac5dde7bdcc6f8ffaa4/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'account',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('provider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerAccountId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'expense',
        columns: [
          col('amount', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('groupId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('payerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('splitType', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'expense_splitType_check_83a3d92c',
            "\"splitType\" IN ('EQUAL', 'EXACT')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'expenseSplit',
        columns: [
          col('amount', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('expenseId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'friendRequest',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('receiverId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('senderId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('PENDING'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'friendRequest_status_check_904c6455',
            "\"status\" IN ('PENDING', 'ACCEPTED', 'REJECTED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'friendship',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('user1Id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('user2Id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'group',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('creatorId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'groupMember',
        columns: [
          col('groupId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'otpVerification',
        columns: [
          col('attempts', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('otpHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'settlement',
        columns: [
          col('amount', 'numeric', { notNull: true, codecRef: { codecId: 'pg/numeric@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('payerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('receiverId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerified', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('emailVerifiedAt', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'account',
        constraint: 'account_provider_providerAccountId_key',
        columns: ['provider', 'providerAccountId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'expenseSplit',
        constraint: 'expenseSplit_expenseId_userId_key',
        columns: ['expenseId', 'userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'friendRequest',
        constraint: 'friendRequest_senderId_receiverId_key',
        columns: ['senderId', 'receiverId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'friendship',
        constraint: 'friendship_user1Id_user2Id_key',
        columns: ['user1Id', 'user2Id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'groupMember',
        constraint: 'groupMember_groupId_userId_key',
        columns: ['groupId', 'userId'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'account',
        index: 'account_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expense',
        index: 'expense_groupId_idx_e2fb5578',
        columns: ['groupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expense',
        index: 'expense_payerId_idx_3d3ae95d',
        columns: ['payerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expenseSplit',
        index: 'expenseSplit_expenseId_idx_69d413fa',
        columns: ['expenseId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'expenseSplit',
        index: 'expenseSplit_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'friendRequest',
        index: 'friendRequest_receiverId_idx_fe124f44',
        columns: ['receiverId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'friendRequest',
        index: 'friendRequest_senderId_idx_4689c490',
        columns: ['senderId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'friendship',
        index: 'friendship_user1Id_idx_db150192',
        columns: ['user1Id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'friendship',
        index: 'friendship_user2Id_idx_d408a8bd',
        columns: ['user2Id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'group',
        index: 'group_creatorId_idx_3a77d800',
        columns: ['creatorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'groupMember',
        index: 'groupMember_groupId_idx_e2fb5578',
        columns: ['groupId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'groupMember',
        index: 'groupMember_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'otpVerification',
        index: 'otpVerification_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'settlement',
        index: 'settlement_payerId_idx_3d3ae95d',
        columns: ['payerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'settlement',
        index: 'settlement_receiverId_idx_fe124f44',
        columns: ['receiverId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'account',
        foreignKey: {
          name: 'account_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expense',
        foreignKey: {
          name: 'expense_groupId_fkey',
          columns: ['groupId'],
          references: { schema: 'public', table: 'group', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expense',
        foreignKey: {
          name: 'expense_payerId_fkey',
          columns: ['payerId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expenseSplit',
        foreignKey: {
          name: 'expenseSplit_expenseId_fkey',
          columns: ['expenseId'],
          references: { schema: 'public', table: 'expense', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'expenseSplit',
        foreignKey: {
          name: 'expenseSplit_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'friendRequest',
        foreignKey: {
          name: 'friendRequest_senderId_fkey',
          columns: ['senderId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'friendRequest',
        foreignKey: {
          name: 'friendRequest_receiverId_fkey',
          columns: ['receiverId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'friendship',
        foreignKey: {
          name: 'friendship_user1Id_fkey',
          columns: ['user1Id'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'friendship',
        foreignKey: {
          name: 'friendship_user2Id_fkey',
          columns: ['user2Id'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'group',
        foreignKey: {
          name: 'group_creatorId_fkey',
          columns: ['creatorId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'groupMember',
        foreignKey: {
          name: 'groupMember_groupId_fkey',
          columns: ['groupId'],
          references: { schema: 'public', table: 'group', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'groupMember',
        foreignKey: {
          name: 'groupMember_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'otpVerification',
        foreignKey: {
          name: 'otpVerification_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'settlement',
        foreignKey: {
          name: 'settlement_payerId_fkey',
          columns: ['payerId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'settlement',
        foreignKey: {
          name: 'settlement_receiverId_fkey',
          columns: ['receiverId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
