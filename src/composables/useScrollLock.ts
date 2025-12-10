import { onMounted, onUnmounted, ref } from 'vue';

export const useScrollLock = () => {
  const scrollY = ref(0);

  onMounted(() => {
    if (typeof window === 'undefined') return;

    const body = document.body;

    // Save the current scroll position
    scrollY.value = window.scrollY;

    // Get the current body styles to restore later
    const { position, top, left, right, overflow, width } =
      body.style as CSSStyleDeclaration;

    // add to dataset to restore later
    body.dataset.prevPosition = position;
    body.dataset.prevTop = top;
    body.dataset.prevLeft = left;
    body.dataset.prevRight = right;
    body.dataset.prevOverflow = overflow;
    body.dataset.prevWidth = width;

    // hard scroll lock
    body.style.position = 'fixed';
    body.style.top = `-${scrollY.value}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    body.style.width = '100%';
  });

  onUnmounted(() => {
    if (typeof window === 'undefined') return;

    const body = document.body;

    // restore scroll position
    body.style.position = body.dataset.prevPosition || '';
    body.style.top = body.dataset.prevTop || '';
    body.style.left = body.dataset.prevLeft || '';
    body.style.right = body.dataset.prevRight || '';
    body.style.overflow = body.dataset.prevOverflow || '';
    body.style.width = body.dataset.prevWidth || '';

    // clear dataset
    delete body.dataset.prevPosition;
    delete body.dataset.prevTop;
    delete body.dataset.prevLeft;
    delete body.dataset.prevRight;
    delete body.dataset.prevOverflow;
    delete body.dataset.prevWidth;

    // restore the scroll position
    window.scrollTo(0, scrollY.value);
  });
};
