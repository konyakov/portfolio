import { useTheme } from 'next-themes';
import React, { Fragment, useMemo } from 'react';
import { BottomSheet as DefaultBottomSheet } from 'react-spring-bottom-sheet';
import config, { Project, WorkStack } from '../../config';
import { getRandomColorPair, getThemeClassName } from '../../util';
import { ColorText } from '../Banner/ColorText';
import { SocialIcons } from '../Footer';
import { TagList } from '../List';
import { SubHeader } from '../SubHeader';

const { personal } = config;

interface BaseBottomSheetProps {
  open: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
}

function BaseBottomSheet(props: BaseBottomSheetProps): React.ReactElement {
  const { open, onDismiss, children } = props;
  const { resolvedTheme } = useTheme();
  const className = getThemeClassName('bottomsheet', resolvedTheme);

  return (
    <DefaultBottomSheet className={className} open={open} onDismiss={onDismiss}>
      {children}
    </DefaultBottomSheet>
  );
}

interface AboutBottomSheetProps extends BaseBottomSheetProps {}

function AboutBottomSheet(props: AboutBottomSheetProps): React.ReactElement {
  const { open, onDismiss } = props;

  const [resumeColor] = useMemo(getRandomColorPair, []);

  const about = (
    <Fragment>
      <span>{personal.about}</span>
      <p className='-ml-2 mt-4'>
        <ColorText
          text='Resume'
          url={personal.resume}
          backgroundColor={resumeColor}
        />
      </p>
    </Fragment>
  );

  return (
    <BaseBottomSheet open={open} onDismiss={onDismiss}>
      <SubHeader className='lg:mt-4' title='About' description={about} />
      <TagList.Stack stack={WorkStack} />
    </BaseBottomSheet>
  );
}

interface ContactBottomSheetProps extends BaseBottomSheetProps {}

function ContactBottomSheet(
  props: ContactBottomSheetProps,
): React.ReactElement {
  const { open, onDismiss } = props;

  return (
    <BaseBottomSheet open={open} onDismiss={onDismiss}>
      <SubHeader
        className='lg:mt-4'
        title={`Let's Connect`}
        description='Do you have a project in mind? Want to hire me? Or simply wanna chat? Feel free to reach out'
      >
        <SocialIcons />
      </SubHeader>
    </BaseBottomSheet>
  );
}

interface ProjectBottomSheetProps extends BaseBottomSheetProps {
  project: Project;
}

function ProjectBottomSheet(
  props: ProjectBottomSheetProps,
): React.ReactElement {
  const { open, onDismiss, project } = props;
  const { title, description, stack, deployment } = project;

  return (
    <BaseBottomSheet open={open} onDismiss={onDismiss}>
      <SubHeader className='lg:mt-4' title={title} description={description} />
      <TagList.Stack stack={stack} />
      <TagList.Deployment deployment={deployment} />
    </BaseBottomSheet>
  );
}

export const BottomSheet = {
  About: AboutBottomSheet,
  Contact: ContactBottomSheet,
  Project: ProjectBottomSheet,
};
