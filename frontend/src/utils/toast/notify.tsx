import { toast, type ToastOptions } from 'react-toastify'

type ToastInput = {
  title: string
  description?: string
}

const toastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export function pushToast(input: ToastInput) {
  toast.success(
    (
      <div className="flex flex-col gap-0.5 text-left">
        <span className="font-semibold text-slate-900">{input.title}</span>
        {input.description ? (
          <span className="text-sm text-slate-600">{input.description}</span>
        ) : null}
      </div>
    ),
    toastOptions,
  )
}

export function pushErrorToast(input: ToastInput) {
  toast.error(
    (
      <div className="flex flex-col gap-0.5 text-left">
        <span className="font-semibold text-slate-900">{input.title}</span>
        {input.description ? (
          <span className="text-sm text-slate-600">{input.description}</span>
        ) : null}
      </div>
    ),
    toastOptions,
  )
}
