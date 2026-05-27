import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react/offline';

import type {
  Theme_Blog_Components_Author_Socials_Index_Socials_Entries,
  Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig,
  Theme_Blog_Components_Author_Socials_Index_Socials_IconConfigMap,
  Theme_Blog_Components_Author_Socials_Index_Socials_Link,
  Theme_Blog_Components_Author_Socials_Index_Socials_Platform,
  Theme_Blog_Components_Author_Socials_Index_Socials_Props,
  Theme_Blog_Components_Author_Socials_Index_Socials,
} from '../../../../../types/theme/Blog/Components/Author/Socials/index.d.ts';

/**
 * Theme - Blog - Components - Author - Socials - Social Icon Configs.
 *
 * Maps each known social platform key to an Iconify icon name and a human
 * label for the link's `title` attribute. Unknown platforms fall back to a
 * generic link icon and the platform key itself.
 *
 * @since 0.18.0
 */
const socialIconConfigs: Theme_Blog_Components_Author_Socials_Index_Socials_IconConfigMap = {
  twitter: {
    icon: 'ri:twitter-fill', label: 'Twitter',
  },
  x: {
    icon: 'ri:twitter-x-fill', label: 'X',
  },
  github: {
    icon: 'ri:github-fill', label: 'GitHub',
  },
  stackoverflow: {
    icon: 'ri:stack-overflow-fill', label: 'Stack Overflow',
  },
  linkedin: {
    icon: 'ri:linkedin-fill', label: 'LinkedIn',
  },
  bluesky: {
    icon: 'ri:bluesky-fill', label: 'Bluesky',
  },
  instagram: {
    icon: 'ri:instagram-fill', label: 'Instagram',
  },
  facebook: {
    icon: 'ri:facebook-fill', label: 'Facebook',
  },
  threads: {
    icon: 'ri:threads-fill', label: 'Threads',
  },
  mastodon: {
    icon: 'ri:mastodon-fill', label: 'Mastodon',
  },
  youtube: {
    icon: 'ri:youtube-fill', label: 'YouTube',
  },
  twitch: {
    icon: 'ri:twitch-fill', label: 'Twitch',
  },
  email: {
    icon: 'ri:mail-fill', label: 'Email',
  },
};

/**
 * Theme - Blog - Components - Author - Socials.
 *
 * Renders an author's social-platform links as a row of icon links. Each
 * known platform (X, GitHub, LinkedIn, etc.) gets a branded Iconify glyph;
 * unknown keys fall back to a generic link icon labeled with the platform name.
 *
 * @param {Theme_Blog_Components_Author_Socials_Index_Socials_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Socials(props: Theme_Blog_Components_Author_Socials_Index_Socials_Props) {
  const socials: Theme_Blog_Components_Author_Socials_Index_Socials = props['author']['socials'] ?? {};
  const entries: Theme_Blog_Components_Author_Socials_Index_Socials_Entries = Object.entries(socials);

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-blog-author-socials ${props['className']}` : 'nova-blog-author-socials'}
      style={props['style']}
    >
      {entries.map((entry) => {
        const platform: Theme_Blog_Components_Author_Socials_Index_Socials_Platform = entry[0];
        const link: Theme_Blog_Components_Author_Socials_Index_Socials_Link = entry[1];
        const config: Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig = socialIconConfigs[platform] ?? {
          icon: 'ri:links-fill', label: platform,
        };

        return (
          <Link key={platform} className="nova-blog-author-social-link" href={link} title={config['label']}>
            <Icon className="nova-blog-author-social-icon" icon={config['icon']} width="16" height="16" aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

export default Socials;
