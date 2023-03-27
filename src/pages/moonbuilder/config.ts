export type StringObject = {
  [key: string]: string;
};

export const groupUrls: StringObject = {
  Body: 'resources/bodies/',
  Top: 'resources/tops/',
  Pants: 'resources/pants/',
  Suit: 'resources/suits/',
  Hair: 'resources/hair/',
  Eyewear: 'resources/eyewear/',
  Facewear: 'resources/facewear/',
  Item: 'resources/items/',
  Footwear: 'resources/footwear/',
  Headwear: 'resources/headwear/',
  Transcended: 'resources/transcended/',
};

const bodies: StringObject = {
  Alien: 'alien.glb',
  'Female Dark': 'female_dark.glb',
  'Female Light': 'female_light.glb',
  'Male Dark': 'male_dark.glb',
  'Male Light': 'male_light.glb',
  Squid: 'squid.glb',
  Vulcan: 'vulcan.glb',
  Droid: 'droid.glb',
};

const tops: StringObject = {
  'Cyber Hoodie Green': 'cyber_hoodie_green.glb',
  'Cyber Hoodie White': 'cyber_hoodie_white.glb',
  'Cyber Jacket Blue': 'cyber_jacket_blue.glb',
  'Cyber Jacket Pink': 'cyber_jacket_pink.glb',
  'Skull Hoodie': 'skull_hoodie.glb',
  'Trench Coat': 'trench.glb',
  Vest: 'vest.glb',
  'Western Jack': 'western.glb',
};

const pants: StringObject = {
  Canvas: 'pants_canvas.glb',
  Camo: 'pants_camo.glb',
  Tactical: 'pants_tactical.glb',
  'LED Pink': 'pants_led_pink.glb',
  'LED Red': 'pants_led_red.glb',
  'LED Yellow': 'pants_led_yellow.glb',
};

const suits: StringObject = {
  'Rough Rider': 'rider.glb',
  'Space Force': 'spaceforce.glb',
  'Space Rebel': 'spacerebel.glb',
};

const hair: StringObject = {
  'Long Red': 'long_red.glb',
  'Long Teal': 'long_yellow.glb',
  'Long Yellow': 'long_teal.glb',
  'Mohawk Blue': 'mohawk_blue.glb',
  'Mohawk Green': 'mohawk_green.glb',
  'Mohawk Pink': 'mohawk_pink.glb',
  'Mohawk White': 'mohawk_white.glb',
  'Mullet Aqua': 'mullet_aqua.glb',
  'Mullet Blonde': 'mullet_blonde.glb',
  'Mullet Pink': 'mullet_pink.glb',
  'Bushido Orange': 'bushido_orange.glb',
  'Bushido Red': 'bushido_red.glb',
  'Bushido White': 'bushido_white.glb',
  'Cropped Blonde': 'cropped_blonde.glb',
  'Cropped Blue': 'cropped_blue.glb',
  'Cropped Pink': 'cropped_pink.glb',
  'Side Part Blue': 'side_part_blue.glb',
  'Side Part Green': 'side_part_green.glb',
  'Side Part Purple': 'side_part_purple.glb',
};

const eyewear: StringObject = {
  Blade: 'blade.glb',
  'Cyborg Optic': 'cyborg_optics.glb',
  Cyclops: 'cyclops.glb',
  'Pilot Goggles': 'goggles.glb',
  'Biometric Scanner': 'biometric_scanner.glb',
  'Sunnies Black': 'sunnies_black.glb',
  'Sunnies Blue': 'sunnies_blue.glb',
  'Sunnies Mirror': 'sunnies_mirror.glb',
};

const facewear: StringObject = {
  Beard: 'beard.glb',
  Joint: 'joint.glb',
  'Iron Mask': 'mask_iron.glb',
  'Kitty Mask': 'mask_kitty.glb',
  'Hazmat Mask': 'mask_hazmat.glb',
};

const items: StringObject = {
  'Darksaber Blue': 'dark_saber_blue.glb',
  'Darksaber Pink': 'dark_saber_pink.glb',
  'Katana White': 'katana_white.glb',
  'Katana Yellow': 'katana_yellow.glb',
  'Lightsaber Blue': 'lightsaber_blue.glb',
  'Lightsaber Green': 'lightsaber_green.glb',
  'Lightsaber Pink': 'lightsaber_pink.glb',
  'Photon Cannon Blue': 'photon_cannon_blue.glb',
  'Photon Cannon Yellow': 'photon_cannon_yellow.glb',
  Revolver: 'revolver.glb',
};

const footwear: StringObject = {
  'Cowboy Boots': 'boots_cowboy.glb',
  'Ice Boots': 'ice_boots.glb',
  'LED Boots Green': 'led_boots_green.glb',
  'LED Boots Pink': 'led_boots_pink.glb',
  'LED Boots Yellow': 'led_boots_yellow.glb',
  'Slides Purple': 'slides_purple.glb',
  'Slides Yellow': 'slides_yellow.glb',
  Tabi: 'tabi.glb',
};

const headwear: StringObject = {
  Beanie: 'beanie.glb',
  Snapback: 'snapback.glb',
  'Cowboy Hat': 'cowboy.glb',
  Sedge: 'sedge_hat.glb',
  'Punk Helmet': 'punk_helmet.glb',
  'Cyber Helmet': 'cyber_helmet.glb',
  'Rebel Helmet': 'rebel_helmet.glb',
};

const transcended: StringObject = {
  Astronaut: 'astronaut.glb',
  Ape: 'ape.glb',
  'Plague Doctor': 'plague_doctor.glb',
  Samurai: 'samurai.glb',
  Ninja: 'ninja.glb',
  'Screen Head': 'screenhead.glb',
  Unicorn: 'unicorn.glb',
  Skull: 'skull.glb',
  Anubis: 'anubis.glb',
};

export const traits: { [key: string]: StringObject } = {
  Body: bodies,
  Top: tops,
  Pants: pants,
  Suit: suits,
  Hair: hair,
  Eyewear: eyewear,
  Facewear: facewear,
  Item: items,
  Footwear: footwear,
  Headwear: headwear,
  Transcended: transcended,
};
