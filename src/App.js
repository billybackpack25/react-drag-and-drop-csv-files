import React from 'react'
import { parse } from 'papaparse';

export default function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [contacts, setContacts] = React.useState([
    {email:"fake@gmail.com",name:'fake'},
  ]);

  return (
    <div>
      <h1 className="text-center text-4xl">Contact Import</h1>
      <div className={`p-6 my-2 mx-auto max-w-md border-2 ${
        highlighted ? 'border-green-600 bg-green-100' : 'border-gray-600'
        }`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => {
          // Prevent the browser from opening up / downloading the file 
          e.preventDefault();
        }}
        onDrop={(e) => {
          // Prevent the browser from opening up / downloading the file 
          e.preventDefault();
          setHighlighted(false);
          // Print out what the browser catches when a file is dropped
          // console.log(e.dataTransfer.files)
          /* 
            lastModified: 1627043717652
            lastModifiedDate: Fri Jul 23 2021 13:35:17 GMT+0100 (British Summer Time) {}
            name: "Screenshot 2021-07-23 133517.png"
            size: 143531
            type: "image/png"
            webkitRelativePath: ""
          */
          // Convert dataObject to array, where filetype is csv
          Array.from(e.dataTransfer.files)
            .filter(file => file.type === 'application/vnd.ms-excel')
            .forEach(async (file) => {
            // Do something with the files here
            const text = await file.text();
            const result = parse(text, { header: true });
            //console.log(result)
            setContacts(prev => [...prev, ...result.data])
          })

        }}
      >
        DROP HERE
      </div>
      <ul>
        {
          contacts.map(contact => (
            <li key={contact.email}>
              <strong>{contact.name}</strong>: {contact.email}
            </li>
            )
          )
        }
      </ul>
    </div>
  )
}