import { useEffect, useState } from 'react';
import { useParams, useRouter } from '@tanstack/react-router';
import { Entity } from '@/interfaces/entity.ts';

export function useChildRoute<T extends Entity>(entities: T[] | undefined, pathname: string, param: string): T | null {
  const router = useRouter();
  const params = useParams({ strict: false });
  const [entity, setEntity] = useState<T | null>(null);

  useEffect((): void => {
    if (!entities?.length) {
      return;
    }

    const entityId: string = params[param] || localStorage.getItem(`${pathname}:${param}`);
    let entity: T | undefined;

    if (entityId) {
      entity = entities.find((process: T): boolean => process.id === entityId);
    }

    if (!entity) {
      entity = entities[0];
    }

    setEntity(entity);
    router.navigate({
      to: pathname,
      params: {
        [param]: entity.id,
      },
    });
  }, [router, params, entities, pathname, param]);

  return entity;
}
