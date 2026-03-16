import { ContainerProps } from '@/src/types/containerProps';

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`max-w-[1500px] mx-auto w-full px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;