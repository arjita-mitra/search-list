import React from 'react';

export const HighlightTxt = ({text = '', highlight = ''}) => {
    if (highlight !== null && !highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex)
    return (
        <span>
            {parts.filter(part => part).map((part, i) => (
                regex.test(part) ? <mark style={{fontWeight: 'bold', color: `var(--primary-color)`, backgroundColor: 'transparent'}} key={i}>{part}</mark> : <span key={i}>{part}</span>
            ))}
        </span>
    )
}