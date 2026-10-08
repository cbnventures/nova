/**
 * Next - Config.
 *
 * Configures the generated Next.js application build directory.
 * Consumers can add supported Next.js options to this shared object.
 *
 * @type {import('next').NextConfig}
 *
 * @since 0.0.0
 */
const nextConfig = {
  distDir: 'build',
[__DOCKER_IMAGE__]
};

export default nextConfig;
