import React from 'react';

export function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event.x + ' - ' + event.t }</li>
      )
    }
    </ul>
  );
}