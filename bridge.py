import os
import sys
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma4:26b"
# Ollama varsayılan bağlamı küçüktür ve fazlasını baştan sessizce keser;
# talimat + MASTER_CONTEXT kaybolmasın diye pencere açıkça ayarlanır.
NUM_CTX = 32768
TIMEOUT = 600

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# MASTER_CONTEXT bağlayıcı kaynaktır, ilk sırada kalmalı.
# MEMORY.md bilinçli olarak dahil değil: başka projelerin kayıtlarını da içeriyor.
TARGET_FILES = [
    "APHROHARMONY_MASTER_CONTEXT.md",
    "aphroharmony-proje.txt",
    "APHROHARMONY_REELS_FINAL.md",
    "LANDING_PAGE_METNI.md",
    "REELS_CEKIM_SENARYOLARI.md",
]


def load_aphro_context():
    """Klasördeki kilit Markdown ve metin dosyalarını tek bağlamda toplar."""
    context = ""
    for fname in TARGET_FILES:
        path = os.path.join(BASE_DIR, fname)
        if not os.path.exists(path):
            print(f"[Uyarı] {fname} bulunamadı, atlanıyor.", file=sys.stderr)
            continue
        try:
            with open(path, "r", encoding="utf-8") as f:
                context += f"\n\n=== {fname} ===\n" + f.read()
        except Exception as e:
            print(f"[Uyarı] {fname} okunamadı: {e}", file=sys.stderr)
    return context


def ask_aphro(task_prompt):
    context = load_aphro_context()
    if not context.strip():
        return "Hata: Bağlam dosyaları okunamadı veya klasör boş."

    full_prompt = f"""Sen APHROHARMONY markasının ürün ve satış zekasısın.
Aşağıda markanın ana ürün dosyaları yer almaktadır.
APHROHARMONY_MASTER_CONTEXT.md bağlayıcıdır: Bölüm 4'te uydurulmaması gerekenler ve
Bölüm 6'daki iletişim sınırları diğer tüm dosyalardan önce gelir. Çelişki varsa MASTER_CONTEXT geçerlidir.

{context}

---
GÖREV:
{task_prompt}
"""
    try:
        res = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": full_prompt,
                "stream": False,
                "options": {"num_ctx": NUM_CTX},
            },
            timeout=TIMEOUT,
        )
        if res.status_code != 200:
            return f"Ollama Hatası: {res.status_code} - {res.text}"
        data = res.json()
        used = data.get("prompt_eval_count")
        if used and used >= NUM_CTX:
            print(f"[Uyarı] İstem {used} token; bağlam penceresi ({NUM_CTX}) dolmuş olabilir.", file=sys.stderr)
        return data.get("response", "")
    except requests.exceptions.ConnectionError:
        return "Bağlantı Hatası: Ollama çalışmıyor. 'ollama serve' ile başlatın."
    except Exception as e:
        return f"Bağlantı Hatası: {str(e)}"


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) < 2:
        print("Kullanım: python bridge.py \"Görevinizi buraya yazın\"")
        sys.exit(1)

    prompt = " ".join(sys.argv[1:])
    print(f"[{MODEL_NAME} APHROHARMONY dosyalarını analiz ediyor...]\n")
    print(ask_aphro(prompt))
