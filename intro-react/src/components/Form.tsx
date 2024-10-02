import React, { useState } from 'react';
import Button from './Button';

type FormProps = {
  onAdd: (todo: { title: string; content: string }) => void;
};

export default function Form(props: FormProps) {

    const { onAdd } = props;
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      onAdd({ title, content });
      setTitle('');
      setContent('');
    }
    };

    return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <Button text="Add" id="add-button" onClick={() => {}} />
    </form>
    )

    
}