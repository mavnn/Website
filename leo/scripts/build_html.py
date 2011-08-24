#!/bin/python
import markdown
import os

def get_template(filepath):
    f = open(filepath)
    s = f.read()
    f.flush()
    f.close()
    return s

input_dir = '../md'
output_dir = '../../www'
top = get_template('../glue/top.html')
bottom = get_template('../glue/bottom.html')

def htmlify(filepath):
    f = open(filepath)
    s = markdown.markdown(open(filepath).read())
    return top + s + bottom

def htmlify_directory(input_dir, output_dir):
    filenames = [f for f in os.listdir(input_dir) if f.endswith('.md') and not f.startswith('.')]
    for filename in filenames:
        output_file = open(os.path.join(output_dir, filename[:-3] + '.html'), 'w')
        output_file.write(htmlify(os.path.join(input_dir, filename)))
        output_file.flush()
        output_file.close()

htmlify_directory(input_dir, output_dir)
    
    
