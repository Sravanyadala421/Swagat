import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Room } from '../types';
import { roomService } from '../services/api';

interface RoomContextType {
    rooms: Room[];
    loading: boolean;
    addRoom: (roomData: Omit<Room, 'id'>) => Promise<void>;
    deleteRoom: (id: string) => Promise<void>;
    refreshRooms: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRooms = async () => {
        try {
            const { data } = await roomService.getAll();
            setRooms(data);
        } catch (error) {
            console.error("Failed to fetch rooms", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const addRoom = async (roomData: Omit<Room, 'id'>) => {
        try {
            await roomService.create(roomData);
            fetchRooms(); // Refresh list
        } catch (error) {
            console.error("Failed to add room", error);
            throw error;
        }
    };

    const deleteRoom = async (id: string) => {
        try {
            await roomService.delete(id);
            fetchRooms();
        } catch (error) {
            console.error("Failed to delete room", error);
            throw error;
        }
    };

    return (
        <RoomContext.Provider value={{ rooms, loading, addRoom, deleteRoom, refreshRooms: fetchRooms }}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRooms = () => {
    const context = useContext(RoomContext);
    if (context === undefined) {
        throw new Error('useRooms must be used within a RoomProvider');
    }
    return context;
};
