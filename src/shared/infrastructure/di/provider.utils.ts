import type { Provider, Type } from '@nestjs/common';

type InjectionToken = string | symbol;

export function providePort<T>(
  token: InjectionToken,
  implementation: Type<T>,
): Provider<T> {
  return {
    provide: token,
    useClass: implementation,
  };
}

export function provideUseCase<TDependencies extends unknown[], T>(
  token: InjectionToken,
  inject: InjectionToken[],
  factory: (...dependencies: TDependencies) => T,
): Provider<T> {
  return {
    provide: token,
    useFactory: factory,
    inject,
  };
}
