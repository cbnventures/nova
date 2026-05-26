import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import {
  Children,
  isValidElement,
  useState,
} from 'react';

import Details from '../Details/index.js';

import type {
  ThemeShowcaseIndexItemChildren,
  ThemeShowcaseIndexItemProps,
  ThemeShowcaseIndexItemReturns,
  ThemeShowcaseIndexItemTitle,
  ThemeShowcaseIndexItemUnknownCast,
  ThemeShowcaseIndexShowcaseAllOpen,
  ThemeShowcaseIndexShowcaseChildren,
  ThemeShowcaseIndexShowcaseChildrenArray,
  ThemeShowcaseIndexShowcaseCollapseAllLabel,
  ThemeShowcaseIndexShowcaseDescription,
  ThemeShowcaseIndexShowcaseExpandAllLabel,
  ThemeShowcaseIndexShowcaseHandleItemToggleIndex,
  ThemeShowcaseIndexShowcaseHandleItemToggleIsOpen,
  ThemeShowcaseIndexShowcaseHandleItemTogglePrevious,
  ThemeShowcaseIndexShowcaseHandleToggleAllNextOpen,
  ThemeShowcaseIndexShowcaseItemElement,
  ThemeShowcaseIndexShowcaseItemElements,
  ThemeShowcaseIndexShowcaseLayoutDescription,
  ThemeShowcaseIndexShowcaseOpenMap,
  ThemeShowcaseIndexShowcaseOpenMapState,
  ThemeShowcaseIndexShowcaseProps,
  ThemeShowcaseIndexShowcaseReturns,
  ThemeShowcaseIndexShowcaseSetOpenMap,
  ThemeShowcaseIndexShowcaseTitleLabel,
  ThemeShowcaseIndexShowcaseToggleAllLabel,
} from '../../types/theme/Showcase/index.d.ts';

/**
 * Theme - Showcase - Item.
 *
 * Data carrier that declares one demonstrated block for the parent
 * showcase. Renders nothing on its own - the parent enumerates Item
 * children and wraps each in a controlled Details disclosure.
 *
 * @param {ThemeShowcaseIndexItemProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ShowcaseItem(_props: ThemeShowcaseIndexItemProps): ThemeShowcaseIndexItemReturns {
  return null as ThemeShowcaseIndexItemUnknownCast as ThemeShowcaseIndexItemReturns;
}

/**
 * Theme - Showcase.
 *
 * Reusable shell for block showcase pages. Renders an intro card with
 * a title, description, and Expand/Collapse All toggle. Each Item is a
 * controlled Details - clicks sync the parent's per-item state map.
 *
 * @param {ThemeShowcaseIndexShowcaseProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Showcase(props: ThemeShowcaseIndexShowcaseProps): ThemeShowcaseIndexShowcaseReturns {
  const layoutDescription: ThemeShowcaseIndexShowcaseLayoutDescription = props['layoutDescription'];
  const description: ThemeShowcaseIndexShowcaseDescription = props['description'];
  const children: ThemeShowcaseIndexShowcaseChildren = props['children'];

  const childrenArray: ThemeShowcaseIndexShowcaseChildrenArray = Children.toArray(children);
  const itemElements: ThemeShowcaseIndexShowcaseItemElements = childrenArray.filter(
    (child) => isValidElement(child) === true && child['type'] === ShowcaseItem,
  ) as ThemeShowcaseIndexShowcaseItemElements;

  const state: ThemeShowcaseIndexShowcaseOpenMapState = useState<ThemeShowcaseIndexShowcaseOpenMap>({});
  const openMap: ThemeShowcaseIndexShowcaseOpenMap = state[0];
  const setOpenMap: ThemeShowcaseIndexShowcaseSetOpenMap = state[1];

  const allOpen: ThemeShowcaseIndexShowcaseAllOpen = (
    itemElements.length > 0
    && itemElements.every((_item, index) => openMap[index] === true)
  );

  const collapseAllLabel: ThemeShowcaseIndexShowcaseCollapseAllLabel = translate({
    id: 'theme.showcase.collapseAll',
    message: 'Collapse All',
    description: 'The button label that collapses every Showcase Item disclosure',
  });
  const expandAllLabel: ThemeShowcaseIndexShowcaseExpandAllLabel = translate({
    id: 'theme.showcase.expandAll',
    message: 'Expand All',
    description: 'The button label that expands every Showcase Item disclosure',
  });
  const titleLabel: ThemeShowcaseIndexShowcaseTitleLabel = translate({
    id: 'theme.showcase.title',
    message: 'Block Showcase',
    description: 'The h1 heading of the Showcase page that introduces the on-page block disclosures',
  });
  const toggleAllLabel: ThemeShowcaseIndexShowcaseToggleAllLabel = (allOpen === true) ? collapseAllLabel : expandAllLabel;

  function handleToggleAll() {
    const nextOpen: ThemeShowcaseIndexShowcaseHandleToggleAllNextOpen = (allOpen === false);
    const nextMap: ThemeShowcaseIndexShowcaseOpenMap = {};

    itemElements.forEach((_item, index) => {
      Reflect.set(nextMap, index, nextOpen);

      return;
    });

    setOpenMap(nextMap);

    return undefined;
  }

  function handleItemToggle(index: ThemeShowcaseIndexShowcaseHandleItemToggleIndex, isOpen: ThemeShowcaseIndexShowcaseHandleItemToggleIsOpen) {
    setOpenMap((previous: ThemeShowcaseIndexShowcaseHandleItemTogglePrevious) => ({
      ...previous,
      [index]: isOpen,
    }));

    return undefined;
  }

  return (
    <Layout description={layoutDescription}>
      <main
        className={(props['className'] !== undefined) ? `nova-container nova-showcase ${props['className']}` : 'nova-container nova-showcase'}
        style={props['style']}
      >
        <div className="nova-showcase-intro">
          <h1 className="nova-showcase-intro-title">{titleLabel}</h1>
          <p className="nova-showcase-intro-description">
            {description}
          </p>
          <button
            className="nova-cta-secondary nova-showcase-intro-toggle"
            type="button"
            onClick={handleToggleAll}
          >
            {toggleAllLabel}
          </button>
        </div>
        {itemElements.map((item: ThemeShowcaseIndexShowcaseItemElement, index) => {
          const itemTitle: ThemeShowcaseIndexItemTitle = item['props']['title'];
          const itemChildren: ThemeShowcaseIndexItemChildren = item['props']['children'];

          return (
            <Details
              key={`nova-showcase-item-${index}`}
              open={openMap[index] === true}
              onToggle={(isOpen) => handleItemToggle(index, isOpen)}
              summary={<h2>{itemTitle}</h2>}
            >
              {itemChildren}
            </Details>
          );
        })}
      </main>
    </Layout>
  );
}

Showcase.Item = ShowcaseItem;

export default Showcase;
