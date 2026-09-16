import { useEffect, useRef, useSyncExternalStore } from 'react'
import {
  generateFocusId,
  getFocusedId,
  registerFocusable,
  setFocus,
  subscribeFocus,
  unregisterFocusable,
} from '../lib/focusStore'

interface UseFocusableOptions {
  id?: string
  onEnter?: () => void
  disabled?: boolean
  /** claim initial focus if nothing else is focused yet when this mounts */
  focusOnMount?: boolean
}

export function useFocusable<T extends HTMLElement>({
  id: providedId,
  onEnter,
  disabled = false,
  focusOnMount = false,
}: UseFocusableOptions = {}) {
  const idRef = useRef(providedId ?? generateFocusId())
  const id = idRef.current
  const ref = useRef<T | null>(null)
  const onEnterRef = useRef(onEnter)
  onEnterRef.current = onEnter

  useEffect(() => {
    registerFocusable(id, { ref, disabled, onEnterRef })
    if (focusOnMount && getFocusedId() === null) {
      setFocus(id, { scroll: false })
    }
    return () => unregisterFocusable(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, disabled])

  const focused = useSyncExternalStore(subscribeFocus, () => getFocusedId() === id)

  return {
    ref,
    focused,
    id,
    onMouseEnter: () => setFocus(id, { scroll: false }),
  }
}
