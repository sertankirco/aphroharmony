import sys, glob
from PIL import Image
prefix, cols, scale, out = sys.argv[1], int(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
files = sorted(glob.glob(prefix + '-*.png'))
ims = [Image.open(f) for f in files]
w, h = int(ims[0].width * scale), int(ims[0].height * scale)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * (w + 8), rows * (h + 8)), (255, 0, 255))
for i, im in enumerate(ims):
    sheet.paste(im.resize((w, h)), ((i % cols) * (w + 8), (i // cols) * (h + 8)))
sheet.save(out)
