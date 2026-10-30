import { Task } from "src/utils/types";
import { get, post, patch, del } from "./http-service";

// Shape returned by the API. Dates arrive as ISO strings.
type TaskDto = {
    id: string;
    title: string;
    description: string | null;
    isCompleted: boolean;
    scheduledDate: string | null;
    creationDate: string;
};

export type TaskChanges = {
    title?: string;
    description?: string;
    isCompleted?: boolean;
    scheduledDate?: Date | number | null;
};

// Dates become timestamps (numbers) so tasks can be kept in Redux, which
// only stores plain serializable values.
const toTask = (dto: TaskDto): Task => ({
    id: dto.id,
    title: dto.title,
    description: dto.description ?? '',
    isCompleted: dto.isCompleted,
    creationDate: Date.parse(dto.creationDate),
    scheduledDate: dto.scheduledDate ? Date.parse(dto.scheduledDate) : null,
});

// The API accepts `scheduledAt` but returns `scheduledDate`.
const toRequestBody = ({ scheduledDate, ...rest }: TaskChanges) => ({
    ...rest,
    ...(scheduledDate !== undefined && {
        scheduledAt: scheduledDate === null ? null : new Date(scheduledDate).toISOString(),
    }),
});

/* get all of the user's tasks, newest first */
async function getTasks(): Promise<Task[]> {
    const res = await get<TaskDto[]>('tasks');
    return Array.isArray(res) ? res.map(toTask) : [];
};

async function createTask(
    data: TaskChanges & { title: string }
): Promise<Task> {
    const res = await post<TaskDto>('tasks', toRequestBody(data));
    return toTask(res);
};

async function updateTask(
    id: string,
    changes: TaskChanges
): Promise<Task> {
    const res = await patch<TaskDto>(`tasks/${id}`, toRequestBody(changes));
    return toTask(res);
};

async function deleteTask(id: string): Promise<void> {
    await del(`tasks/${id}`);
};

export const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
