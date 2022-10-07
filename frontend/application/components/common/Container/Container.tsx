import { FC, ReactNode } from 'react';

const Container: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='content-wrapper'>
      <div className='content'>
        <div className='container-fluid'>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Container;
