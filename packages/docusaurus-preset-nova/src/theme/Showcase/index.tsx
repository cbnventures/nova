import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import {
  Children,
  isValidElement,
  useState,
} from 'react';

import Details from '../Details/index.js';

import type {
  Theme_Showcase_Index_ItemChildren,
  Theme_Showcase_Index_ItemProps,
  Theme_Showcase_Index_ItemReturns,
  Theme_Showcase_Index_ItemTitle,
  Theme_Showcase_Index_ItemUnknownCast,
  Theme_Showcase_Index_Showcase_AllOpen,
  Theme_Showcase_Index_Showcase_Children,
  Theme_Showcase_Index_Showcase_ChildrenArray,
  Theme_Showcase_Index_Showcase_CollapseAllLabel,
  Theme_Showcase_Index_Showcase_Description,
  Theme_Showcase_Index_Showcase_ExpandAllLabel,
  Theme_Showcase_Index_Showcase_HandleItemToggle_Index,
  Theme_Showcase_Index_Showcase_HandleItemToggle_IsOpen,
  Theme_Showcase_Index_Showcase_HandleItemToggle_Previous,
  Theme_Showcase_Index_Showcase_HandleToggleAll_NextOpen,
  Theme_Showcase_Index_Showcase_LayoutDescription,
  Theme_Showcase_Index_Showcase_OpenMap,
  Theme_Showcase_Index_Showcase_OpenMapState,
  Theme_Showcase_Index_Showcase_Props,
  Theme_Showcase_Index_Showcase_Returns,
  Theme_Showcase_Index_Showcase_SetOpenMap,
  Theme_Showcase_Index_Showcase_TitleLabel,
  Theme_Showcase_Index_Showcase_ToggleAllLabel,
  Theme_Showcase_Index_ShowcaseItem_Element,
  Theme_Showcase_Index_ShowcaseItem_Elements,
} from '../../types/theme/Showcase/index.d.ts';

/**
 * Theme - Showcase - Item.
 *
 * Data carrier that declares one demonstrated block for the parent
 * showcase. Renders nothing on its own - the parent enumerates Item
 * children and wraps each in a controlled Details disclosure.
 *
 * @param {Theme_Showcase_Index_ItemProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function ShowcaseItem(_props: Theme_Showcase_Index_ItemProps): Theme_Showcase_Index_ItemReturns {
  return null as Theme_Showcase_Index_ItemUnknownCast as Theme_Showcase_Index_ItemReturns;
}

/**
 * Theme - Showcase.
 *
 * Reusable shell for block showcase pages. Renders an intro card with
 * a title, description, and Expand/Collapse All toggle. Each Item is a
 * controlled Details - clicks sync the parent's per-item state map.
 *
 * @param {Theme_Showcase_Index_Showcase_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Showcase(props: Theme_Showcase_Index_Showcase_Props): Theme_Showcase_Index_Showcase_Returns {
  const layoutDescription: Theme_Showcase_Index_Showcase_LayoutDescription = props['layoutDescription'];
  const description: Theme_Showcase_Index_Showcase_Description = props['description'];
  const children: Theme_Showcase_Index_Showcase_Children = props['children'];

  const childrenArray: Theme_Showcase_Index_Showcase_ChildrenArray = Children.toArray(children);
  const itemElements: Theme_Showcase_Index_ShowcaseItem_Elements = childrenArray.filter(
    (child) => isValidElement(child) === true && child['type'] === ShowcaseItem,
  ) as Theme_Showcase_Index_ShowcaseItem_Elements;

  const state: Theme_Showcase_Index_Showcase_OpenMapState = useState<Theme_Showcase_Index_Showcase_OpenMap>({});
  const openMap: Theme_Showcase_Index_Showcase_OpenMap = state[0];
  const setOpenMap: Theme_Showcase_Index_Showcase_SetOpenMap = state[1];

  const allOpen: Theme_Showcase_Index_Showcase_AllOpen = (
    itemElements.length > 0
    && itemElements.every((_item, index) => openMap[index] === true)
  );

  const collapseAllLabel: Theme_Showcase_Index_Showcase_CollapseAllLabel = translate({
    id: 'theme.showcase.collapseAll',
    message: 'Collapse All',
    description: 'The button label that collapses every Showcase Item disclosure',
  });
  const expandAllLabel: Theme_Showcase_Index_Showcase_ExpandAllLabel = translate({
    id: 'theme.showcase.expandAll',
    message: 'Expand All',
    description: 'The button label that expands every Showcase Item disclosure',
  });
  const titleLabel: Theme_Showcase_Index_Showcase_TitleLabel = translate({
    id: 'theme.showcase.title',
    message: 'Block Showcase',
    description: 'The h1 heading of the Showcase page that introduces the on-page block disclosures',
  });
  const toggleAllLabel: Theme_Showcase_Index_Showcase_ToggleAllLabel = (allOpen === true) ? collapseAllLabel : expandAllLabel;

  function handleToggleAll() {
    const nextOpen: Theme_Showcase_Index_Showcase_HandleToggleAll_NextOpen = (allOpen === false);
    const nextMap: Theme_Showcase_Index_Showcase_OpenMap = {};

    itemElements.forEach((_item, index) => {
      Reflect.set(nextMap, index, nextOpen);

      return;
    });

    setOpenMap(nextMap);

    return undefined;
  }

  function handleItemToggle(index: Theme_Showcase_Index_Showcase_HandleItemToggle_Index, isOpen: Theme_Showcase_Index_Showcase_HandleItemToggle_IsOpen) {
    setOpenMap((previous: Theme_Showcase_Index_Showcase_HandleItemToggle_Previous) => ({
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
        {itemElements.map((item: Theme_Showcase_Index_ShowcaseItem_Element, index) => {
          const itemTitle: Theme_Showcase_Index_ItemTitle = item['props']['title'];
          const itemChildren: Theme_Showcase_Index_ItemChildren = item['props']['children'];

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
