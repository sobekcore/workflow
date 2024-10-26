import { useEffect, useState } from 'react';
import { useParams, useRouter } from '@tanstack/react-router';
import { Entity } from '@/interfaces/entity.ts';

export function useChildRoute<T extends Entity>(entities: T[] | undefined, url: string, param: string): T | null {
  const router = useRouter();
  const params = useParams({ strict: false });
  const [entity, setEntity] = useState<T | null>(null);

  useEffect((): void => {
    if (!entities?.length) {
      return;
    }

    const entityId: string = params[param] ?? localStorage.getItem(`${url}:${param}`);
    const entity: T | undefined = entityId
      ? entities.find((process: T): boolean => process.id === entityId) ?? entities[0]
      : entities[0];

    if (!entity) {
      setEntity(null);
      return;
    }

    setEntity(entity);
    router.navigate({
      to: url,
      params: {
        [param]: entity.id,
      },
    });
  }, [router, params, entities, url, param]);

  return entity;
}
