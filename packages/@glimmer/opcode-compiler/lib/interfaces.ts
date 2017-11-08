import {
  VMHandle,
  Opaque,
  SymbolTable,
  Option,
  BlockSymbolTable,
  ComponentCapabilities,
  CompileTimeProgram
} from '@glimmer/interfaces';
import { Core, SerializedTemplateBlock } from '@glimmer/wire-format';
import { Macros } from './syntax';
import { STDLib } from '@glimmer/bundle-compiler';

export interface EagerResolver<Locator> {
  getCapabilities(locator: Locator): ComponentCapabilities;
}

export interface EagerCompilationOptions<Specifier, R extends EagerResolver<Specifier>> {
  resolver: R;
  program: CompileTimeProgram;
  macros: Macros;
}

export interface CompilableTemplate<S extends SymbolTable> {
  symbolTable: S;
  compile(stdLib?: STDLib): VMHandle;
}

export type CompilableBlock = CompilableTemplate<BlockSymbolTable>;

export type Primitive = undefined | null | boolean | number | string;

export type ComponentArgs = [Core.Params, Core.Hash, Option<CompilableBlock>, Option<CompilableBlock>];
export type Specifier = Opaque;

export interface ComponentBuilder {
  static(definition: number, args: ComponentArgs): void;
}

export interface ParsedLayout<Specifier = Opaque> {
  id?: Option<string>;
  block: SerializedTemplateBlock;
  referrer: Specifier;
}
