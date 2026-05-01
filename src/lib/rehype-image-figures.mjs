function isElement(node, tagName) {
  return node && node.type === 'element' && node.tagName === tagName;
}

function isWhitespaceText(node) {
  return node && node.type === 'text' && node.value.trim() === '';
}

function addImageDefaults(imageNode) {
  imageNode.properties = imageNode.properties || {};

  if (imageNode.properties.loading == null) {
    imageNode.properties.loading = 'lazy';
  }

  if (imageNode.properties.decoding == null) {
    imageNode.properties.decoding = 'async';
  }
}

function findStandaloneImage(paragraphNode) {
  let imageNode;

  for (const child of paragraphNode.children || []) {
    if (isWhitespaceText(child)) {
      continue;
    }

    if (isElement(child, 'img') && imageNode === undefined) {
      imageNode = child;
      continue;
    }

    return undefined;
  }

  return imageNode;
}

function createFigure(imageNode, caption) {
  return {
    type: 'element',
    tagName: 'figure',
    properties: {},
    children: [
      imageNode,
      {
        type: 'element',
        tagName: 'figcaption',
        properties: {},
        children: [{ type: 'text', value: caption }],
      },
    ],
  };
}

function visit(node) {
  if (!node || !Array.isArray(node.children)) {
    return;
  }

  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];

    if (isElement(child, 'img')) {
      addImageDefaults(child);
      continue;
    }

    if (isElement(child, 'p')) {
      const imageNode = findStandaloneImage(child);

      if (imageNode) {
        addImageDefaults(imageNode);

        const title = imageNode.properties?.title;
        const caption = typeof title === 'string' ? title.trim() : '';

        if (caption) {
          delete imageNode.properties.title;
          node.children[index] = createFigure(imageNode, caption);
          continue;
        }
      }
    }

    visit(child);
  }
}

export default function rehypeImageFigures() {
  return function transform(tree) {
    visit(tree);
  };
}
