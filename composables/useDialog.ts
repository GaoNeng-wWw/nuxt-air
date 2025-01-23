import { isClient } from "@vueuse/core";
import { DialogPortal } from "radix-vue";
import { render, type VNode } from "vue";
import Dialog from "~/components/ui/dialog/Dialog.vue";
import DialogContent from "~/components/ui/dialog/DialogContent.vue";
import DialogDescription from "~/components/ui/dialog/DialogDescription.vue";
import DialogFooter from "~/components/ui/dialog/DialogFooter.vue";
import DialogHeader from "~/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "~/components/ui/dialog/DialogTitle.vue"
export type UseDialogOptions = {
  title: VNode;
  description: VNode,
  content: VNode,
  footer:VNode,
}

type DialogIntsnace = {
  dialog: VNode,
  anchor: HTMLDivElement
}

const dialogStack: DialogIntsnace[] = [];

export const useDialog = (
  opts: Partial<UseDialogOptions> = {}
) => {
  const {title,description,content,footer} = opts;
  const removeByInstance = (instance: DialogIntsnace) => {
    dialogStack
    .filter(_instance => _instance === instance)
    .forEach(({anchor}) => {
      setTimeout(() => {
        render(null, anchor);
        anchor.remove();
      }, 300);
    })
  }
  function remove(){
   removeByInstance(dialogStack[0]);
   dialogStack.shift();
  }
  return {
    remove,
    removeAll: ()=>{
      while (dialogStack.length){
        const {anchor} = dialogStack.shift()!;
        render(null,anchor);
        anchor.remove();
      }
    },
    render: ()=>{
      if (!isClient){
        return;
      }
      const dialogTtile = h(DialogTitle,title);
      const dialogDescription = h(DialogDescription,description);
      const dialogHeader = h(DialogHeader,[dialogTtile,dialogDescription]);
      const dialogFooter = h(
        DialogFooter,
        footer
      );
      const dialogContent = h(
        DialogContent,
        null,
        {
          default: [h(dialogHeader),content ? h(content) : null, h(dialogFooter)]
        }
      );
      const anchor = document.createElement('div');
      anchor.style.position = 'fixed';
      anchor.style.top = '0';
      anchor.style.left = '0';
      anchor.style.width = '100%';
      anchor.style.height = '100%';
      const dialogPortal = h(
        DialogPortal, {
          to: anchor,
          forceMount: true,
        },
        [
          dialogContent
        ]
      )
      const dialog = h(
        Dialog,
        {
          defaultOpen: true,
          "onUpdate:open": (openState)=>{
            if(!openState){
              removeByInstance(instance)
            }
          },
        },
        dialogPortal
      );
      const instance = {dialog,anchor};
      dialogStack.push(instance);
      document.body.append(anchor);
      render(dialog, anchor);
    }
  }
}