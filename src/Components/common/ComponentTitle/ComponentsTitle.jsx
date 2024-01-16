import React from 'react'

function ComponentsTitle({titleText}) {
  return (
    <h2 className="font-MorabbaBold pr-4 relative after:content-[''] after:size-3 after:bg-orange-500 after:rounded-sm after:absolute after:right-0 after:top-2"> {titleText}</h2>
  )
}

export default ComponentsTitle
