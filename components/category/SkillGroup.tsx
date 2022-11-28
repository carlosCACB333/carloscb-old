import { Avatar, AvatarGroup } from '@mui/material';
import { FC } from 'react';
import { Skill } from '../../graphql/generated/graphql';
import { Icon } from '../icons';
interface Props {
  skills: Skill[];
}
export const SkillGroup: FC<Props> = ({ skills }) => {
  return (
    <AvatarGroup max={50}>
      {skills.map((skill) => (
        <Avatar key={skill.id} alt={skill.name} sx={{ bgcolor: 'secondary.main', height: 30, width: 30 }}>
          <Icon name={skill.icon as any} />
        </Avatar>
      ))}
    </AvatarGroup>
  );
};
