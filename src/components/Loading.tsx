'use client';

import FloatBox from '@/components/Floatbox';

// enum
const states = {
  loading: 0,
  loaded: 1,
  error: 2,
}

function LoadingError () {
  return (
    <FloatBox>
      <h1>Loading Error</h1>
    </FloatBox>
  )
}

function LoadingScreen() {
  return (
    // isVisible blurred={false}
    <FloatBox>
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-zinc-200 border-t-black rounded-full mx-auto mb-6" />
          <p className="text-lg font-medium text-zinc-700">Loading...</p>
          <p className="text-sm text-zinc-500 mt-1">Please wait</p>
      </div>
    </FloatBox>
  );
}

function Loading ({state}: {state: number}) {
  switch (state) {
    case states.loading:
      return ( <LoadingScreen /> );      
      break;
    case states.error:
      return ( <LoadingError /> );
      break;
    default:
      return ( <LoadingError /> );
      break;
  }
}

export {Loading, states};