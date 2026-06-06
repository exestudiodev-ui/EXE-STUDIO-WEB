/**
 * Base Client for Simulated Network Latency and API Responses
 * EXE Studio
 */

export interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export async function mockApiCall<T>(
  data: T,
  options?: { shouldFail?: boolean; errorMessage?: string; delay?: number }
): Promise<ServiceResponse<T>> {
  const delay = options?.delay ?? 1200;
  return new Promise((resolve) => {
    setTimeout(() => {
      if (options?.shouldFail) {
        resolve({
          success: false,
          message: options.errorMessage || 'Error en la conexión con la nave nodriza. Inténtalo de nuevo.',
        });
      } else {
        resolve({
          success: true,
          message: 'Petición procesada y guardada en los servidores centrales.',
          data,
        });
      }
    }, delay);
  });
}
