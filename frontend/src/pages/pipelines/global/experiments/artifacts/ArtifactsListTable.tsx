import React from 'react';

import {
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateHeader,
  EmptyStateIcon,
  EmptyStateVariant,
  Spinner,
} from '@patternfly/react-core';
import { ExclamationCircleIcon, PlusCircleIcon } from '@patternfly/react-icons';

import { useGetArtifactsList } from './useGetArtifactsList';

export const ArtifactsListTable: React.FC = () => {
  const [artifacts, isArtifactsLoaded, artifactsError] = useGetArtifactsList();

  if (artifactsError) {
    return (
      <Bullseye>
        <EmptyState variant={EmptyStateVariant.lg}>
          <EmptyStateHeader
            titleText="There was an issue loading artifacts"
            icon={<EmptyStateIcon icon={ExclamationCircleIcon} />}
            headingLevel="h2"
          />
          <EmptyStateBody>{artifactsError.message}</EmptyStateBody>
        </EmptyState>
      </Bullseye>
    );
  }

  if (!isArtifactsLoaded) {
    return (
      <Bullseye>
        <Spinner />
      </Bullseye>
    );
  }

  if (!artifacts?.length) {
    return (
      <EmptyState data-testid="artifacts-list-empty-state" variant={EmptyStateVariant.lg}>
        <EmptyStateHeader
          titleText="No artifacts"
          icon={<EmptyStateIcon icon={PlusCircleIcon} />}
          headingLevel="h4"
        />
        <EmptyStateBody>
          No artifacts have been generated from experiments within this project. Select a different
          project, or execute an experiment from the <b>Experiments and runs</b> page.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return <></>;
};
