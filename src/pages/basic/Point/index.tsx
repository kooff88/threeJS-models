import React, { FC } from 'react';
import styles from './index.less';

const Point: FC<{}> = () => {
  return (
    <div className={styles.container}>
      <div>point</div>
      <div>point2</div>
    </div>
  );
};

export default Point;
