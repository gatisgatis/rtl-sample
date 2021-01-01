import React, { FC } from "react";

type Props = {
  text?: string;
};

export const FullName: FC<Props> = ({ text='User Anonymus' }) => {
  return <h4>USERS NAME: {text}</h4>;
};


