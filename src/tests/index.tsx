import { ReactNode } from 'react';
import { AppProviders } from '../providers/AppProvider';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Queries } from '@testing-library/dom';

export const Wrapper = ({ children }: { children?: ReactNode }) => {
  return <AppProviders>{children}</AppProviders>;
};

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult;

function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q>
): RenderResult<Q>;

function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, 'queries'>
): RenderResult<Q> | RenderResult {
  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
