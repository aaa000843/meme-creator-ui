import React, { createContext, ReactNode, useContext, useState } from 'react';

import { request } from '@/lib/axios/request';

import { CreateVectorDTO, UpdateVectorDTO, Vector } from '@/models/vectors';

interface VectorContextType {
  vectors: Vector[];
  uploadVector: (dto: CreateVectorDTO) => Promise<void>;
  fetchVectors: () => Promise<void>;
  deleteVector: (id: string) => Promise<void>;
  updateVector: (
    id: string,
    updates: Partial<UpdateVectorDTO>,
  ) => Promise<void>;
}

const VectorContext = createContext<VectorContextType | undefined>(undefined);

export const VectorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [vectors, setVectors] = useState<Vector[]>([]);

  const uploadVector = async (dto: CreateVectorDTO) => {
    const response = await request<Vector>('/vectors', {
      method: 'POST',
      data: dto,
    });

    setVectors((prev) => [...prev, response]);
  };

  const fetchVectors = async () => {
    const response = await request<Vector[]>('/vectors', {
      method: 'GET',
    });
    setVectors(response);
  };

  const deleteVector = async (id: string) => {
    await request(`/vectors/${id}`, {
      method: 'DELETE',
    });
    setVectors((prev) => prev.filter((vector) => vector._id !== id));
  };

  const updateVector = async (
    id: string,
    updates: Partial<UpdateVectorDTO>,
  ) => {
    const response = await request<Vector>(`/vectors/${id}`, {
      method: 'PATCH',
      data: updates,
    });
    setVectors((prev) =>
      prev.map((vector) => (vector._id === id ? response : vector)),
    );
  };

  return (
    <VectorContext.Provider
      value={{
        vectors,
        uploadVector,
        fetchVectors,
        deleteVector,
        updateVector,
      }}
    >
      {children}
    </VectorContext.Provider>
  );
};

export const useVector = (): VectorContextType => {
  const context = useContext(VectorContext);
  if (!context) {
    throw new Error('useVector must be used within a VectorProvider');
  }
  return context;
};
