import type { Extension } from '@codemirror/state';
import { EditorView } from 'codemirror';
import { v4 } from 'uuid';

export interface BaseFileHandle {
  name: string;
  id: string;
  pos: number;
}

export type FileStatus = ({
  status: 'success';
  url: string;
} & BaseFileHandle) | ({
  status: 'fail';
  reason: string;
  name: string;
  id: string;
  pos: number;
} & BaseFileHandle);

export interface events {
  onSuccess: (handle: BaseFileHandle) => void;
  onFail: (handle: BaseFileHandle) => void;
}

export interface DragImageUploadOptions {
  accept: string[];
  upload: (id: string, file: File, name: string, pos: number) => Promise<FileStatus>;
  events: events;
}

export type FileHandle = Promise<FileStatus>;

export type FileHandleMap = FileHandle[];

export function dragImageUpload(options: Partial<DragImageUploadOptions>): Extension {
  const opt: Partial<DragImageUploadOptions> = {
    accept: ['image/png', 'image/jpeg'],
    events: {
      onSuccess: () => {},
      onFail: () => {},
    },
    ...options,
  };
  const fileHandles: FileHandleMap = [];
  let pos: number | null = null;
  return EditorView.domEventHandlers({
    dragover(event, view) {
      const { clientX: x, clientY: y } = event;
      pos = view.posAtCoords({ x, y });
    },
    drop(event, view) {
      if (!pos) {
        const { clientX: x, clientY: y } = event;
        pos = view.posAtCoords({ x, y });
      }
      event.preventDefault();
      if (opt.upload === undefined || pos == null) {
        return;
      }
      const files = event.dataTransfer?.files ?? [];
      for (const file of files) {
        const name = file.name;
        const id = v4();
        const uploadHandle = opt.upload(id, file, name, pos);
        fileHandles.push(uploadHandle);
      }
      Promise.all(fileHandles)
        .then((handles) => {
          handles.forEach((handle) => {
            if (handle.status !== 'success') {
              options.events?.onFail(handle);
              return;
            }
            options.events?.onSuccess(handle);
          });
          return handles;
        })
        .then((handles) => {
          handles.forEach((handle) => {
            const { name, pos } = handle;
            const content = `\n![fail]()\n`;
            if (handle.status === 'success') {
              const url = handle.url;
              const content = `\n![${name}](${url})\n`;
              view.dispatch({
                changes: {
                  from: pos,
                  insert: content,
                },
                selection: {
                  anchor: pos + content.length,
                  head: pos + content.length,
                },
              });
              return;
            }
            view.dispatch({
              changes: {
                from: pos,
                insert: content,
              },
              selection: {
                anchor: pos + content.length,
                head: pos + content.length,
              },
            });
          });
        })
        .finally(() => {
          fileHandles.length = 0;
          pos = null;
        });
    },
  });
}
